import * as React from 'react';
import { ViewStyle } from 'react-native';
export interface ComponentGroup {
    fontFamily?: string;
    fontSize?: string;
    useLightText?: boolean;
}
export interface ComponentItemProps {
    label: string;
    value?: any;
    selected?: boolean;
    fontFamily?: string;
    fontSize?: string;
    useLightText?: boolean;
}
export declare class Group extends React.Component<ComponentGroup> {
    render(): any;
}
export declare class Item extends React.Component<ComponentItemProps> {
    render(): any;
}
export interface UltraPickerIOSProps {
    onChange?: (result: any) => void;
    style: ViewStyle;
    testID?: string;
}
export interface UltraPickerIOSState {
    componentsData?: ComponentGroup[];
    selectedIndexes?: Number[];
    closeBar?: JSX.Element;
}
export declare class UltraPickerIOS extends React.Component<UltraPickerIOSProps, UltraPickerIOSState> {
    constructor(props: any);
    _stateBasedOnProps(nextProps: any): UltraPickerIOSState;
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
export interface UltraPickerIOSCloseBarProps {
    cancelButtonText?: string;
    onCancel?: (result: any) => void;
    doneButtonText?: string;
    onDone?: (result: any) => void;
    style?: ViewStyle;
}
export declare class UltraPickerIOSCloseBar extends React.Component<UltraPickerIOSCloseBarProps> {
    render(): JSX.Element;
}
