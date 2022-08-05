import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const Datetime = ({ label, mode, selected, minDate }) => {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
		selected(currentDate);
	};

	const showMode = () => {
		if (Platform.OS === 'android') {
			setShow(false);
		}
	};

	const showPicker = (type) => {
		showMode(type); //'time'
		setShow(!show);
	};

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={styles.inputContainer}
				onPress={() => showPicker(mode)}
			>
				<Text style={styles.input} numberOfLines={1}>
					{date.toDateString()}
				</Text>
				<Icons
					name='calendar-range'
					color={Colors.gray}
					size={22}
					style={styles.icon}
				/>
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					testID='dateTimePicker'
					value={date}
					mode={mode}
					is24Hour={true}
					onChange={onChange}
					minimumDate={minDate}
				/>
			)}
		</View>
	);
};

export default Datetime;

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
});
