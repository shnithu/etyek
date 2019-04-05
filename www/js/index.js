/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);
// Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {
	console.log("onDeviceReady");
	//$('.debug').append('onDeviceReady</br>')
	window.dr = true;
	init();
}
// Handle the online event
function onOnline() {
	// Handle the online event
	console.log("onOnline");
	// $('.debug').append('onOnline</br>')
	init()
}
function onOffline() {
	// Handle the offline event
	console.log("onOffline");
	// $('.debug').append('onOnline</br>')
	$('.app').remove();
	$('#app').attr("src","offline.html");
}
function init() {
	console.log("init");
	// $('.debug').append('init</br>')
	if (window.dr === true) {
		console.log("push");
        // $('.debug').append('push</br>')
		var push = PushNotification.init({
			android: {
				senderID: "860280172907",
				sound: true,
				vibrate: true,
				icon: 'icon'
			},
			ios: {
				alert: "true",
				badge: "false",
				sound: "true"
			},
			browser: {
				pushServiceURL: 'http://push.api.phonegap.com/v1/push'
			}
		});
		push.on('registration', (data) => {
            // $('.debug').append(data.registrationId+'</br>')
			$('.app').remove();
			$('#app').attr("src","http://etyek.livepointstudio.com/indexA.php?token="+data.registrationId+"&uuid="+device.uuid);
		});
		push.on('notification', (data) => {
			console.dir (data);
			$('#app').attr("src","http://etyek.livepointstudio.com/indexA.php?uuid="+device.uuid+"&notId="+data.additionalData.notId);
			// data.message,// data.title,// data.count,// data.sound,// data.image,// data.additionalData
		});
		push.on('error', (e) => {
			console.log (e.message)
            // $('.debug').append(e.message+'</br>')
		});
	}
}