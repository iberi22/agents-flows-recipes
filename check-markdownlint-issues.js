const fs = require('fs');
const path = require('path');

// Function to check for blank lines around fenced code blocks
function checkBlankLinesAroundFences(content) {
  const lines = content.split('\n');
  const errors = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for fenced code blocks
    if (line.trim() === '```') {
      // Check line before fence
      if (i > 0 && lines[i-1].trim() !== '') {
        errors.push(`Missing blank line before fenced code block at line ${i+1}`);
      }
      
      // Find closing fence
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== '```') {
        j++;
      }
      
      // Check line after closing fence
      if (j < lines.length - 1 && lines[j+1].trim() !== '') {
        errors.push(`Missing blank line after fenced code block at line ${j+1}`);
      }
      
      i = j; // Skip to closing fence
    }
  }
  
  return errors;
}

// Function to check for blank lines around lists
function checkBlankLinesAroundLists(content) {
  const lines = content.split('\n');
  const errors = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for list items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || /^\s*\d+\.\s/.test(line)) {
      // Check if there's a blank line before the list
      if (i > 0 && lines[i-1].trim() !== '' && !lines[i-1].trim().match(/^[-*]\s/) && !lines[i-1].trim().match(/^\d+\.\s/)) {
        // Check if the previous line is not a list item of the same type
        if (!lines[i-1].trim().startsWith('- ') && !lines[i-1].trim().startsWith('* ') && !/^\s*\d+\.\s/.test(lines[i-1])) {
          errors.push(`Missing blank line before list at line ${i+1}`);
        }
      }
      
      // Skip to end of list
      let j = i;
      while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* ') || /^\s*\d+\.\s/.test(lines[j]))) {
        j++;
      }
      
      // Check if there's a blank line after the list
      if (j < lines.length && lines[j].trim() !== '' && !lines[j].trim().startsWith('#')) {
        errors.push(`Missing blank line after list at line ${j}`);
      }
      
      i = j - 1; // Continue from end of list
    }
  }
  
  return errors;
}

// Function to check YAML frontmatter
function checkYamlFrontmatter(content) {
  const errors = [];
  
  // Check if file starts with ---
  if (!content.startsWith('---\n')) {
    errors.push('File does not start with proper YAML frontmatter');
  }
  
  // Find end of frontmatter
  const lines = content.split('\n');
  let frontmatterEnd = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontmatterEnd = i;
      break;
    }
  }
  
  if (frontmatterEnd === -1) {
    errors.push('YAML frontmatter not properly closed');
  }
  
  return errors;
}

// Check all markdown files in testing directory
const testingDir = path.join(__dirname, 'testing');
const files = fs.readdirSync(testingDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(testingDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\nChecking ${file}:`);
  
  // Check YAML frontmatter
  const frontmatterErrors = checkYamlFrontmatter(content);
  if (frontmatterErrors.length > 0) {
    console.log('  YAML Frontmatter Issues:');
    frontmatterErrors.forEach(error => console.log(`    - ${error}`));
  }
  
  // Check blank lines around fenced code blocks
  const fenceErrors = checkBlankLinesAroundFences(content);
  if (fenceErrors.length > 0) {
    console.log('  Blank Line Issues Around Fenced Code Blocks:');
    fenceErrors.forEach(error => console.log(`    - ${error}`));
  }
  
  // Check blank lines around lists
  const listErrors = checkBlankLinesAroundLists(content);
  if (listErrors.length > 0) {
    console.log('  Blank Line Issues Around Lists:');
    listErrors.forEach(error => console.log(`    - ${error}`));
  }
  
  if (frontmatterErrors.length === 0 && fenceErrors.length === 0 && listErrors.length === 0) {
    console.log('  No issues found');
  }
});
