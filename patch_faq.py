import re

with open('src/app/faq/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('        </div>\n      </div>\n    </div>\n  );\n}', '        </div>\n      </div>\n      <MedicalDisclaimer />\n    </div>\n  );\n}')

with open('src/app/faq/page.tsx', 'w') as f:
    f.write(content)
