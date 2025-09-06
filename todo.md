<!-- 1. done

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

use this badges across the application to indicate status or categories or tags or any other relevant information. -->
<!-- 
2.


shaswatraj@Sh splitmate %   npx shadcn@latest add "http://skiper-ui.com/registry/card-carousel.json"

✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - src/components/ui/card-carousel.tsx
ℹ Skipped 1 files: (files might be identical, use --overwrite to overwrite)
  - src/components/ui/badge.tsx

shaswatraj@Sh splitmate % 


add this card carousel component to the dashboard page to showcase featured expense groups or recent activities. and also on landing page to highlight app features show users. that this many users are using the app. -->



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

---

 https://www.assistant-ui.com/docs/runtimes/ai-sdk/use-chat

 
 ---

<!-- 

 create one more item in the sidebar that is friends / that will contain the connected friends / analytics page is already there / add a bills page where bill history will be stored / and make the projects list in the sidebar onclick work


 ---

 create http://localhost:3000/chat/history - http://localhost:3000/analytics/insights - http://localhost:3000/analytics/reports and reorganise components in http://localhost:3000/analytics -


 ---

also in the /chat people can also ask for charts also create a http://localhost:3000/chat/suggesions where all the types of prompts will be listed which can be asked to user also in the there show that you can also upload your bill or phonepay screenshots to get things done - also add this fetures in the backend and list all possile chat suggestion on suggestions page also add it to the sidebar


---

✓ Compiled /api/chat in 675ms
 POST /api/chat 200 in 9512ms
Error: Route "/groups/[id]" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at GroupPage (src/app/(dashboard-cl)/groups/[id]/page.tsx:396:40)
  394 |
  395 | export default function GroupPage({ params }: GroupPageProps) {
> 396 |     const group = mockGroupsData[params.id as keyof typeof mockGroupsData];
      |                                        ^
  397 |
  398 |     if (!group) {
  399 |         notFound(); {
  
}
 GET /groups/goa-trip-2024 200 in 85ms
 ○ Compiling /about ...
 ✓ Compiled /about in 1775ms
 ⨯ [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.] {
  digest: '1397331044'
}
 GET /about 200 in 2371ms
 ✓ Compiled in 128ms
 ✓ Compiled /about in 52ms
 GET /about 200 in 182ms


---

also add these conversational tools to the chat interface and make them work with mock data for now

---

add voice input support using web speech api in the chat interface -->


---


whatsapp and telegram bot,
swiggy ui
resend
twilio



---

<!-- create a section for auto fetch and split bills from phonepay, google pay, paytm, amazon pay etc. using their apis or by parsing sms or email notifications
fetch split bills from zepto / swiggy / instamart / blinkit / zomato  (from the api provided by them )

add it in the sidebar as "Auto Fetch & Split" and create a page for it where user can connect their accounts and see the fetched bills and split them with friends
they can also upload their sms or email notifications to parse and split bills or click on the share button in there upi apps to share the bill directly to the app screenshot ocr using openai -->

----

also on the sidebar add a button to open telegram bot of splitmate
If API returns error then fall back to hard coded data
Quadrant vector search 

---

use mongoose and mongodb to create the backend of the app

---

create the telegram bot
