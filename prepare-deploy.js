const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Check if archiver is installed
try {
  require.resolve('archiver');
} catch (e) {
  console.error('Archiver package is not installed. Please run: npm install archiver --save-dev');
  process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync('deploy')) {
  fs.mkdirSync('deploy');
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join('deploy', 'innoart-deploy.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`✅ Deployment ZIP created successfully: ${archive.pointer()} total bytes`);
  console.log('📦 File: deploy/innoart-deploy.zip');
  console.log('🚀 Ready for deployment to Netlify!');
});

// Handle warnings and errors
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('⚠️ Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Check if dist directory exists
if (!fs.existsSync('dist')) {
  console.error('❌ Error: dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Add dist directory contents
archive.directory('dist/', false);

// Add netlify.toml file
if (fs.existsSync('netlify.toml')) {
  archive.file('netlify.toml', { name: 'netlify.toml' });
} else {
  console.warn('⚠️ Warning: netlify.toml not found. Creating a default one...');
  
  const netlifyToml = `[build]
  publish = "dist"
  command = "echo 'Already built'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  
  fs.writeFileSync('netlify.toml', netlifyToml);
  archive.file('netlify.toml', { name: 'netlify.toml' });
}

// Add package.json (for reference)
if (fs.existsSync('package.json')) {
  archive.file('package.json', { name: 'package.json' });
}

// Add README.md if it exists
if (fs.existsSync('README.md')) {
  archive.file('README.md', { name: 'README.md' });
}

// Add deployment guide
if (fs.existsSync('DEPLOYMENT_GUIDE.md')) {
  archive.file('DEPLOYMENT_GUIDE.md', { name: 'DEPLOYMENT_GUIDE.md' });
}

// Finalize the archive
archive.finalize();