'use client'

export default function Page() {
    
async function handleSendEmail(){
  console.log("email button clicked")
    await fetch('/api/send-email-brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'gurjiitsingh2@gmail.com',
          subject: 'Thanks for your order!',
          message: 'We have received your order and are preparing it!',
        }),
      });
}


  return (
    <div>
        <button className='p-2 rounded-2xl bg-amber-300' onClick={()=>handleSendEmail()}>Send Email</button>


    </div>
  )
}
