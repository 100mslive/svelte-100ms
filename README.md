
This branch builds upon the [main](https://github.com/100mslive/svelte-100ms) branch where we go through steps to set up a simple Video Call App in Svelte. Now that we have built the app, we'll go through adding different important features in the app.


### [Demo Link](https://svelte-100ms.vercel.app/)

### Device Settings

![Device Settings](static/deviceSettings.png)

Giving user the ability to change between audio and video devices is a must for any Video Call Application. The relevant SDK's selectors and methods are documented [here](https://www.100ms.live/docs/javascript/v2/features/device-change).

Changes done([Commit](https://github.com/100mslive/svelte-100ms/commit/936ff04f6a4631b981f802211bf53ff314695c44)) - 
- Create two new svelte stores in hmsStore.ts - `hmsAllDevices` for list of all devices and `hmsSelectedDevices` for the selected devices
- Install svelte-simple-modal as dev dependency(`yarn add svelte-simple-modal --dev`) for rendering device selection in a modal
- Create a DeviceSettings.svelte component which is responsible for showing the devices in select dropdowns and handle change
- Create a new button in Footer which can be clicked to open the Device Settings modal

