import os

files_to_update = [
    'src/app/page.tsx',
    'src/app/about/page.tsx',
    'src/app/faq/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/blog/[slug]/page.tsx'
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()

        if "MedicalDisclaimer" not in content:
            # Find the last import
            last_import_index = content.rfind("import ")
            end_of_last_import = content.find("\n", last_import_index) + 1

            new_content = content[:end_of_last_import] + "import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';\n" + content[end_of_last_import:]

            # Now we need to figure out where to insert <MedicalDisclaimer /> based on the file
            if "blog/[slug]/page.tsx" in filepath:
                # Add before MDXRemote
                new_content = new_content.replace("<MDXRemote", "<MedicalDisclaimer />\n          <MDXRemote")
            elif "blog/page.tsx" in filepath:
                # Add after the page title
                new_content = new_content.replace('className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">', 'className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">\n          <MedicalDisclaimer />')
                if "MedicalDisclaimer />" not in new_content:
                  new_content = new_content.replace('className="text-4xl md:text-5xl font-bold tracking-tight mb-4">', 'className="text-4xl md:text-5xl font-bold tracking-tight mb-4">\n          <MedicalDisclaimer />')
            elif "page.tsx" in filepath and filepath != 'src/app/blog/[slug]/page.tsx' and filepath != 'src/app/blog/page.tsx':
               # Add inside a <main> or the first main div block if <main> doesn't exist
               if "<main" in new_content:
                   new_content = new_content.replace("<main", "<main>\n      <MedicalDisclaimer />\n", 1).replace("<main>\n      <MedicalDisclaimer />\n className", "<main className")
               elif '<div className="max-w-4xl mx-auto py-12 px-6">' in new_content:
                   new_content = new_content.replace('<div className="max-w-4xl mx-auto py-12 px-6">', '<div className="max-w-4xl mx-auto py-12 px-6">\n      <MedicalDisclaimer />')
               else:
                   # Try to find the first large div
                   new_content = new_content.replace("return (\n    <div", "return (\n    <div\n      ><MedicalDisclaimer />")

            with open(filepath, 'w') as f:
                f.write(new_content)
