const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed. Only POST requests are accepted.' }),
    };
  }

  try {
    // Parse the request body as JSON
    const requestBody = JSON.parse(event.body);
    const { fileBase64, fileName } = requestBody;

    // Validate required fields
    if (!fileBase64 || !fileName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields. Please provide both fileBase64 and fileName.' 
        }),
      };
    }

    // Validate file extension
    if (!fileName.toLowerCase().endsWith('.docx')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Invalid file type. Only .docx files are allowed.' 
        }),
      };
    }

    // Decode the base64 string to a Buffer
    const fileBuffer = Buffer.from(fileBase64, 'base64');

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('docx-files')
      .upload(fileName, fileBuffer, {
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        upsert: true, // Overwrite files with the same name
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: `Failed to upload file: ${error.message}` 
        }),
      };
    }

    // Return success response with the uploaded file path
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        path: data.path,
        message: 'File uploaded successfully' 
      }),
    };

  } catch (err) {
    console.error('Upload function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: `Server error: ${err.message || 'Failed to process upload'}` 
      }),
    };
  }
}; 