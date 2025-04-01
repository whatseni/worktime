"use client"
import { useEffect, useState } from "react";
import { sendNotification, subscribeUser, unsubscribeUser } from "../app/actions";
import { urlBase64ToUnit8Array } from "../app/utils/urlBase";
import Switch from "./common/Switch";

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })

    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub)
  }
  
  async function subscribeToPush() {
    const registation = await navigator.serviceWorker.ready;
    const sub = await registation.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUnit8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      )
    })
    console.log(sub)
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }
  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('dfsfa')
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  const handleChange = (checked: boolean) => {
    if (checked) {
      subscribeToPush()
    } else {
      unsubscribeFromPush()
    }
  }
  return (
      <Switch 
        label=""
        defaultChecked={subscription ? true : false}
        onChange={handleChange} />
  )
}