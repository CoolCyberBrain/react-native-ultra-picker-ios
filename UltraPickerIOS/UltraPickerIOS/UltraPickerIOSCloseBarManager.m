//
//  UltraPickerIOSCloseBarManager.m
//  UltraPickerIOS
//
//  Created by Tim Sawtell on 3/10/17.
//  Copyright © 2017 Sportsbet. All rights reserved.
//

#import "UltraPickerCloseBar.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface UltraPickerIOSCloseBarManager : RCTViewManager

@end

@implementation UltraPickerIOSCloseBarManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
    UltraPickerCloseBar *view = [UltraPickerCloseBar new];
    return view;
}

RCT_EXPORT_VIEW_PROPERTY(cancelButtonText, NSString)
RCT_EXPORT_VIEW_PROPERTY(doneButtonText, NSString)
RCT_EXPORT_VIEW_PROPERTY(onCancel, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDone, RCTBubblingEventBlock)


@end
