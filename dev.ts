import app from './app.ts';

// Start a local server for testing
Deno.serve(app.fetch);
