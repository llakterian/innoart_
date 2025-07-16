const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Check if archiver is installed
try {
  require.resolve('archiver');
} catch (e) {
  console.error('❌ Archiver package is not installed. Please run: npm install archiver --save-dev');
  process.exit(1);
}

console.log('🚀 Creating optimized Netlify deployment package...');

// Create output directory if it doesn't exist
if (!fs.existsSync('deploy')) {
  fs.mkdirSync('deploy');
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join('deploy', 'innoart-netlify.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Track what we're including
let includedFiles = [];

// Listen for all archive data to be written
output.on('close', function() {
  console.log('\n✅ Optimized deployment package created successfully!');
  console.log(`📦 File: deploy/innoart-netlify.zip`);
  console.log(`📊 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('\n📋 Included files:');
  includedFiles.forEach(file => console.log(`   ✓ ${file}`));
  console.log('\n🚀 Ready for Netlify deployment!');
  console.log('   Upload to: https://netlify.com/drop');
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
  console.error('❌ Error creating archive:', err);
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Check if dist directory exists
if (!fs.existsSync('dist')) {
  console.error('❌ Error: dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

console.log('📁 Adding built application files...');

// Add only the built application files from dist directory
archive.directory('dist/', false);
includedFiles.push('dist/ (built application files)');

// Add netlify.toml configuration file
if (fs.existsSync('netlify.toml')) {
  archive.file('netlify.toml', { name: 'netlify.toml' });
  includedFiles.push('netlify.toml (Netlify configuration)');
  console.log('   ✓ netlify.toml found and added');
} else {
  console.log('   ⚠️ netlify.toml not found, creating default configuration...');
  
  const netlifyToml = `[build]
  publish = "dist"
  command = "echo 'Already built'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "16"
`;
  
  fs.writeFileSync('netlify.toml', netlifyToml);
  archive.file('netlify.toml', { name: 'netlify.toml' });
  includedFiles.push('netlify.toml (auto-generated configuration)');
}

// Add _redirects file if it exists (alternative to netlify.toml redirects)
if (fs.existsSync('_redirects')) {
  archive.file('_redirects', { name: '_redirects' });
  includedFiles.push('_redirects (redirect rules)');
}

// Add _headers file if it exists (for custom headers)
if (fs.existsSync('_headers')) {
  archive.file('_headers', { name: '_headers' });
  includedFiles.push('_headers (custom headers)');
}

// OPTIONAL: Add minimal documentation (commented out to keep package minimal)
// Uncomment these lines if you want to include documentation in the deployment
/*
if (fs.existsSync('README.md')) {
  archive.file('README.md', { name: 'README.md' });
  includedFiles.push('README.md (project documentation)');
}
*/

console.log('📦 Finalizing archive...');

// Finalize the archive (this triggers the 'close' event)
archive.finalize();