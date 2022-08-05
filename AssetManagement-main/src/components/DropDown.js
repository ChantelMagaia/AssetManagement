import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

const useMountedState = () => {
	const mountedRef = useRef(false);
	const isMounted = useCallback(() => mountedRef.current, []);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, [isMounted]);

	return isMounted;
};

const DropDown = ({ label, options, selected, value }) => {
	let isMounted = useMountedState();
	const [focus, setFocus] = useState(false);
	const [option, setOption] = useState('-- select option --');

	const select = (option) => {
		if (isMounted()) {
			setFocus(!focus);
			setOption(option);
			selected(option);
		}
	};

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={styles.inputContainer}
				onPress={() => setFocus(!focus)}
			>
				<Text style={styles.input} numberOfLines={1}>
					{option}
				</Text>
				<Icons
					name='unfold-more-horizontal'
					color={Colors.gray}
					size={22}
					style={styles.icon}
				/>
			</TouchableOpacity>
			{focus && (
				<View style={styles.options}>
					<TouchableOpacity
						style={styles.option}
						onPress={() => select('-- select option --')}
						key={0}
					>
						<Text
							style={[styles.input, { color: Colors.gray }]}
							numberOfLines={1}
						>
							{value}
						</Text>
					</TouchableOpacity>
					{options.map((option, index) => {
						return (
							<TouchableOpacity
								style={styles.option}
								onPress={() => select(option.title)}
								key={index + 1}
							>
								<Text style={styles.input} numberOfLines={1}>
									{option.title}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			)}
		</View>
	);
};

export default DropDown;

const styles = StyleSheet.create({
	label: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
		marginLeft: 5,
		marginTop: 10,
	},
	inputContainer: {
		width: windowWidth * 0.94,
		paddingVertical: 12,
		paddingHorizontal: 5,
		borderColor: Colors.gray,
		borderRadius: 3,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
	input: {
		flex: 1,
		paddingHorizontal: 10,
		fontSize: 14,
		fontFamily: Fonts.Regular,
		color: Colors.dark,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		alignSelf: 'flex-end',
	},
	options: {
		flex: 0,
		borderWidth: 1,
		borderColor: Colors.gray,
		backgroundColor: Colors.gray,
	},
	option: {
		width: windowWidth * 0.9,
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderBottomColor: Colors.gray,
		borderBottomWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
});
