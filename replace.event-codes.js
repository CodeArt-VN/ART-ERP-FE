const { replaceInFile } = require('replace-in-file');
const fs = require('fs');
const path = require('path');

// Đọc và parse EVENT_TYPE từ file event-type.ts
function parseEventTypeFromFile() {
  const eventTypePath = path.join(__dirname, 'src/app/services/static/event-type.ts');
  const content = fs.readFileSync(eventTypePath, 'utf8');
  
  // Extract EVENT_TYPE object từ file
  const eventTypeMatch = content.match(/export const EVENT_TYPE = ({[\s\S]*?});/);
  if (!eventTypeMatch) {
    throw new Error('Không thể parse EVENT_TYPE từ file');
  }
  
  // Tạo mapping từ event codes sang constants
  const mappings = [];
  
  // Parse EVENT_TYPE object structure
  // Tìm tất cả categories (USER, APP, POS, etc.)
  const categoryPattern = /(\w+):\s*{([\s\S]*?)}/g;
  const categories = [...content.matchAll(categoryPattern)];
  
  console.log(`📋 Tìm thấy ${categories.length} categories trong EVENT_TYPE`);
  
  // Vòng lặp ngoài: duyệt qua các categories
  categories.forEach(categoryMatch => {
    const categoryName = categoryMatch[1];
    const categoryContent = categoryMatch[2];
    
    console.log(`  🔍 Đang xử lý category: ${categoryName}`);
    
    // Tìm tất cả events trong category này
    const eventPattern = /(\w+):\s*['"]([^'"]+)['"]/g;
    const events = [...categoryContent.matchAll(eventPattern)];
    
    console.log(`    📝 Tìm thấy ${events.length} events trong ${categoryName}`);
    
    // Vòng lặp trong: duyệt qua các events trong category
    events.forEach(eventMatch => {
      const eventName = eventMatch[1];
      const eventCode = eventMatch[2];
      const constant = `EVENT_TYPE.${categoryName}.${eventName}`;
      
      console.log(`      🔄 ${eventCode} → ${constant}`);
      
      // Thêm cả single và double quotes
      mappings.push({
        from: `'${eventCode}'`,
        to: constant
      });
      mappings.push({
        from: `"${eventCode}"`,
        to: constant
      });
    });
  });
  
  console.log(`✅ Tổng cộng tạo được ${mappings.length} mappings`);
  return mappings;
}

// Tạo danh sách replacements từ EVENT_TYPE
const res = parseEventTypeFromFile();

// Cấu hình thư mục và file cần xử lý
const options = {
  files: [
    'src/**/*.ts',
  ],
  ignore: [
    'node_modules/**',
    'dist/**',
    'build/**',
    'coverage/**',
    '*.spec.ts',
    '*.test.ts',
    '*.e2e-spec.ts',
    'src/app/services/static/event-type.ts', // Bỏ qua file định nghĩa constants
  ],
  countMatches: true,
  dry: true, // Set to true để xem trước kết quả mà không thay đổi file
};

console.log('🚀 Bắt đầu thay thế event codes...');
console.log(`📊 Tổng số patterns cần thay thế: ${res.length}`);

// Thực hiện thay thế từng pattern
async function replaceEventCodes() {
  let totalReplacements = 0;
  let processedFiles = new Set();

  for (let i = 0; i < res.length; i++) {
    const pattern = res[i];
    console.log(`\n🔄 [${i + 1}/${res.length}] Thay thế: ${pattern.from} → ${pattern.to}`);

    try {
      const replaceOptions = {
        ...options,
        from: new RegExp(pattern.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        to: pattern.to,
      };

      const results = await replaceInFile(replaceOptions);
      
      if (results && results.length > 0) {
        results.forEach(result => {
          if (result.hasChanged) {
            console.log(`  ✅ ${result.file}: ${result.numReplacements} thay thế`);
            totalReplacements += result.numReplacements;
            processedFiles.add(result.file);
          }
        });
      } else {
        console.log(`  ⚪ Không tìm thấy pattern trong file nào`);
      }
    } catch (error) {
      console.error(`  ❌ Lỗi khi thay thế pattern ${pattern.from}:`, error.message);
    }
  }

  console.log('\n📈 Tổng kết:');
  console.log(`  📁 Số file đã xử lý: ${processedFiles.size}`);
  console.log(`  🔄 Tổng số thay thế: ${totalReplacements}`);
  console.log('✅ Hoàn thành thay thế event codes!');
}

// Chạy script
replaceEventCodes().catch(error => {
  console.error('❌ Lỗi khi thực hiện thay thế:', error);
  process.exit(1);
});
