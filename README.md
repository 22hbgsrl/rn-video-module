# Video module

React Native module with video

Dependecy used: [React Native video](https://github.com/react-native-video/react-native-video)

## Installation

```sh
yarn add @22hbg/rn-video-module react-native-video react-native-orientation

cd ios/ && pod install
```

### Additional steps:

#### Core

[Android setup](https://rnfirebase.io/#2-android-setup)\
[iOS setup](https://rnfirebase.io/#3-ios-setup)

#### Crashlitics

[Android setup](https://rnfirebase.io/crashlytics/android-setup)

## Usage

### Initialize remote config

```javascript
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { initializeRemoteConfig } from '@22hbg/rn-firebase-module'

export default App = () => {
    useEffect(() => {
        initializeRemoteConfig({
            data: 'value'
        })
        .then(() => console.log('success'))
            .catch(() => console.error('error: ', error))
    })

    return <View />
}

export default App
```

### Request notification permission

```javascript
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { requestNotificationPermission } from '@22hbg/rn-firebase-module'
import messaging from '@react-native-firebase/messaging'

export default App = () => {
    useEffect(() => {
        checkUserPermission()
    })

    const checkUserPermission = async () => {
        const permission = await requestNotificationPermission()

        const enabled = permission === messaging.AuthorizationStatus.AUTHORIZED || permission === messaging.AuthorizationStatus.PROVISIONAL

        if (enabled) {
            console.log('Authorization status:', permission)
        }
    }

    return <View />
}

export default App
```
