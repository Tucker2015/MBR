import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import { AnimatedTabBarNavigator, TabElementDisplayOptions } from 'react-native-animated-nav-tab-bar'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'
import Radio from '../screens/RadioHome'
import Twitter from '../screens/Twitter'
import Facebook from '../screens/Facebook'
import Website from '../screens/Website'
import Schedule from '../screens/Schedule'
import VideoPlayer from '../screens/VideoPlayer'

const Tabs = AnimatedTabBarNavigator()



const TabBarIcon = props => {
	return (
		<Icon
			name={props.name}
			size={props.size ? props.size : 24}
			color={props.tintColor}
		/>
	)
}

export default () => (
	<Tabs.Navigator
		tabBarOptions={{
			showLabel: false,
			activeTintColor: '#fff',
			inactiveTintColor: '#2E64a0',
			activeBackgroundColor: '#0B6AF4',
			tabStyle: 'icon-only'
		}}
		appearance={{
			tabBarBackground: 'rgba(0,0,0,1)',
			floating: false,
			whenActiveShow: 'TabElementDisplayOptions.ICON_ONLY',
			topPadding: 5,
			bottomPadding: 5,
			horizontalPadding: 5,
			shadow: true,
			whenActiveShow: 'icon-only',
			whenInactiveShow: 'icon-only',
			dotSize: 'small'
		}}
		initialRouteName="Radio">

		<Tabs.Screen
			name="Radio"
			component={Radio}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="ios-headset"
					/>
				),
			}}
		/>
		<Tabs.Screen
			name="Schedule"
			component={Schedule}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="calendar-outline"
					/>
				),
			}}
		/>
		<Tabs.Screen
			name="Twitter"
			component={Twitter}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="logo-twitter"
					/>
				),
			}}
		/>
		<Tabs.Screen
			name="Facebook"
			component={Facebook}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="logo-facebook"
					/>
				),
			}}
		/>


		<Tabs.Screen
			name="Video"
			component={VideoPlayer}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="videocam-outline"
					/>
				),
			}}
		/>
		<Tabs.Screen
			name="Web"
			component={Website}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="ios-globe"
					/>
				),
			}}
		/>

	</Tabs.Navigator>
)