1.

shaswatraj@Sh splitmate % npx shadcn@latest add https://www.kibo-ui.com/r/pill.json
✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - src/components/ui/kibo-ui/pill/index.tsx
ℹ Skipped 3 files: (files might be identical, use --overwrite to overwrite)
  - src/components/ui/avatar.tsx
  - src/components/ui/badge.tsx
  - src/components/ui/button.tsx

shaswatraj@Sh splitmate % 

use this badges across the application to indicate status or categories or tags or any other relevant information.

2.


shaswatraj@Sh splitmate %   npx shadcn@latest add "http://skiper-ui.com/registry/card-carousel.json"

✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - src/components/ui/card-carousel.tsx
ℹ Skipped 1 files: (files might be identical, use --overwrite to overwrite)
  - src/components/ui/badge.tsx

shaswatraj@Sh splitmate % 


add this card carousel component to the dashboard page to showcase featured expense groups or recent activities. and also on landing page to highlight app features show users. that this many users are using the app.



3. use this button on landing page
function BasicExample() {
 
  return (
   <div className="w-full flex ">
        <WrapButton className="mt-10" href="/docs/components/card-carousel" >
            <Globe className="animate-spin " />
            Get started
        </WrapButton>
    </div>
  )
}

4. use this pill component to show status of expenses like settled, pending, overdue etc. or to show categories like food, travel, shopping etc.

5. use this text effect flipper component to add some flair to the landing page by animating the text in the header or important sections.shaswatraj@Sh splitmate % npx shadcn@latest add "http://skiper-ui.com/registry/text-effect-flipper.json"


  - src/components/ui/text-effect-flipper.tsx
ℹ Skipped 1 files: (files might be identical, use --overwrite to overwrite)
  - src/components/ui/badge.tsx

shaswatraj@Sh splitmate % 


6.   - src/components/ui/kibo-ui/kanban/index.tsx use this kanban component to show task management or expense tracking in a visual way. for example, you can create columns for different expense categories and move expenses between them as they are added or settled.
