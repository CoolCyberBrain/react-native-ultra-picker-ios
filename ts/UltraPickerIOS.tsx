//
//  UltraPickerIOS
//
//  Created by Tim Sawtell on 3/10/17.
//  Copyright © 2017 Sportsbet. All rights reserved.
//

import * as React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';

import { requireNativeComponent } from 'react-native';
const UltraPickerIOSNative = requireNativeComponent("UltraPickerIOS", null) as React.ComponentClass<UltraPickerIOSNative>;
const UltraPickerIOSCloseBarNative = requireNativeComponent("UltraPickerIOSCloseBar", null) as React.ComponentClass<UltraPickerIOSCloseBarNative> ;
const DEFAULT_CLOSEBAR_HEIGHT = 44
const DEFAULT_PICKER_HEIGHT = 216

interface UltraPickerIOSNative {
    componentsData?: any,
    selectedIndexes?: Number[]
    onChange?: (result: any) => void
    style?: ViewStyle
    testID?: string
}

interface UltraPickerIOSCloseBarNative {
    cancelButtonText?: string,
    onCancel?: (result: any) => void,
    doneButtonText?: string,
    onDone?: (result: any) => void,
    style?: ViewStyle,
}

export interface ComponentGroup {
    fontFamily?: string,
    fontSize?: string,
    useLightText?: boolean,
}

export interface ComponentItemProps {
    label: string,
    value?: any,
    selected?: boolean,
    fontFamily?: string,
    fontSize?: string,
    useLightText?: boolean,
}

interface NativeGroup extends ComponentGroup {
    items?: ComponentItemProps[],
}

export class Group extends React.Component<ComponentGroup> {
    render() {
        return null
    }
}

export class Item extends React.Component<ComponentItemProps> {
    render() {
        return null
    }
}

export interface UltraPickerIOSProps {
    onChange?: (result: any) => void
    style: ViewStyle
    testID?: string
}

export interface UltraPickerIOSState {
    componentsData?: ComponentGroup[]
    selectedIndexes?: Number[]
    closeBar?: JSX.Element
}

export class UltraPickerIOS extends React.Component<UltraPickerIOSProps, UltraPickerIOSState> {

    constructor(props) {
        super(props);
        this._stateBasedOnProps.bind(this)
        this.state = this._stateBasedOnProps({...props, selectedIndexes: null})
    }

    componentDidMount() {
      this.setState(this._stateBasedOnProps(this.props))
    }

    _stateBasedOnProps(nextProps): UltraPickerIOSState {
        let nextState = {
            componentsData: null,
            closeBar: null,
            selectedIndexes: null
        }
        let components = []
        let selectedIndexes = []
        if (!nextProps.children) {
            return nextState
        }
        let pickerChildren = null
        if (nextProps.children.constructor === Array) {
            pickerChildren = nextProps.children
        } else {
            pickerChildren = [nextProps.children]
        }
        pickerChildren.forEach((child, index) => {
            if (!child) {
                return
            }
            if (child.type === UltraPickerIOSCloseBar) {
                nextState.closeBar = child
            } else if (child.type === Group) {
                let group: ComponentItemProps[] = []
                let groupSelectedItem = 0 // item at index 0 by default
                let items = null
                if (child.props.children) {
                    if (child.props.children.constructor === Array) {
                        items = child.props.children
                    } else {
                        items = [child.props.children]
                    }
                    items.forEach((item, index) => {
                        if (item.type === Item && item.props.label) {
                            const nativeItem: ComponentItemProps = {
                                label: item.props.label,
                                fontFamily: item.props.fontFamily,
                                fontSize: item.props.fontSize,
                                value: (item.props.value || null),
                                useLightText: item.props.useLightText
                            }
                            group.push(nativeItem)
                            if (item.props.selected) {
                                groupSelectedItem = index
                            }
                        }
                    })
                    if (group.length > 0) {
                        const nativeGroup: NativeGroup = {
                            items: group,
                            fontFamily: child.props.fontFamily,
                            fontSize: child.props.fontSize,
                            useLightText: child.props.useLightText
                        }
                        components.push(nativeGroup)
                        selectedIndexes.push(groupSelectedItem)
                    }
                }
            }
        })
        nextState.componentsData = components
        nextState.selectedIndexes = selectedIndexes
        return nextState
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this._stateBasedOnProps(nextProps))
    }

    render() {
        // Allow the caller to not specify any style yet make this component visible
        // via default heights. Adjust the size of `parentViewStyle` so that if there
        // is a CloseBar provided, the picker is the same size as specified by
        // UltraPickerIOS.style and the parent (encapsulating) view is made larger
        // to fit the CloseBar
        let pickerViewStyle = {
            height: DEFAULT_PICKER_HEIGHT,
            ...StyleSheet.flatten(this.props.style)
        }
         let parentViewStyle = {
            ...pickerViewStyle
        }
        if (this.state.closeBar) {
            parentViewStyle.height = parentViewStyle.height as number + DEFAULT_CLOSEBAR_HEIGHT
        }
        return (
            <View style={parentViewStyle}>
                {this.state.closeBar}
                <UltraPickerIOSNative
                    style={pickerViewStyle}
                    onChange={this.props.onChange}
                    componentsData={this.state.componentsData}
                    selectedIndexes={this.state.selectedIndexes}
                    testID={this.props.testID}
                />
            </View>
        )
    }
}

export interface UltraPickerIOSCloseBarProps {
    cancelButtonText?: string,
    onCancel?: (result: any) => void,
    doneButtonText?: string,
    onDone?: (result: any) => void,
    style?: ViewStyle,
}

export class UltraPickerIOSCloseBar extends React.Component<UltraPickerIOSCloseBarProps> {

    render() {
        let style = {
            height: DEFAULT_CLOSEBAR_HEIGHT,
            ... StyleSheet.flatten(this.props.style)
        }
        let cancelButtonText = this.props.cancelButtonText || "Cancel"
        let doneButtonText = this.props.doneButtonText || "Done"
        return (
            <UltraPickerIOSCloseBarNative
                style={style || this.props.style}
                cancelButtonText={cancelButtonText}
                onCancel={this.props.onCancel}
                doneButtonText={doneButtonText}
                onDone={this.props.onDone}
            />
        )
    }
}
