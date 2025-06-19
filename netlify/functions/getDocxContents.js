const { createClient } = require('@supabase/supabase-js');
const mammoth = require('mammoth');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed. Only GET requests are accepted.' }),
    };
  }

  try {
    // List all files in the docx-files bucket
    const { data: fileList, error: listError } = await supabase.storage
      .from('docx-files')
      .list('', {
        limit: 100,
        offset: 0,
      });

    if (listError) {
      console.error('Error listing files:', listError);
      console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: `Failed to list files: ${listError.message}` 
        }),
      };
    }

    // Filter only .docx files
    const docxFiles = fileList.filter(file => 
      file.name.toLowerCase().endsWith('.docx')
    );

    const processedFiles = [];

    // Process each .docx file
    for (const file of docxFiles) {
      try {
        console.log(`Processing file: ${file.name}`);

        // Download the file from Supabase
        const { data: fileData, error: downloadError } = await supabase.storage
          .from('docx-files')
          .download(file.name);

        if (downloadError) {
          console.error(`Failed to download ${file.name}:`, downloadError);
          continue; // Skip this file and continue with the next
        }

        // Convert the Blob to ArrayBuffer
        const arrayBuffer = await fileData.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Use mammoth to convert .docx to HTML
        const result = await mammoth.convertToHtml({ buffer });
        
        // Add the processed file to the results
        processedFiles.push({
          name: file.name,
          content: result.value,
          warnings: result.messages // Include any conversion warnings
        });

        console.log(`Successfully processed: ${file.name}`);

      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        // Continue processing other files even if one fails
        continue;
      }
    }

    // Return the processed files
    return {
      statusCode: 200,
      body: JSON.stringify({
        files: processedFiles,
        totalProcessed: processedFiles.length,
        totalFound: docxFiles.length
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

  } catch (err) {
    console.error('Get docx contents function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: `Server error: ${err.message || 'Failed to process request'}` 
      }),
    };
  }
}; 