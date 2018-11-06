//
//  UltraPickerCloseBar.m
//  UltraPickerIOS
//
//  Created by Tim Sawtell on 3/10/17.
//  Copyright © 2017 Sportsbet. All rights reserved.
//

#import "UltraPickerCloseBar.h"

@implementation UltraPickerCloseBar

- (void)viewDidLoad {
    [super viewDidLoad];

    UIBarButtonItem *barButtonCancel = [[UIBarButtonItem alloc] initWithTitle:self.cancelButtonText
                                                                      style:UIBarButtonItemStylePlain
                                                                     target:self
                                                                     action:@selector(cancelTapped)];

    UIBarButtonItem *flex = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:self action:nil];

    UIBarButtonItem *barButtonDone = [[UIBarButtonItem alloc] initWithTitle:self.doneButtonText
                                                                      style:UIBarButtonItemStyleDone
                                                                     target:self
                                                                     action:@selector(doneTapped)];
    self.items = @[barButtonCancel, flex, barButtonDone];

    [self setBackgroundImage:[UIImage new]
          forToolbarPosition:UIToolbarPositionAny
                  barMetrics:UIBarMetricsDefault];

    self.backgroundColor = [UIColor clearColor]; // set using the backgroundColor style in the react view
    self.clipsToBounds = YES; // removes the border. Again, use the view style in React to change this
}

- (void)cancelTapped
{
    if (self.onCancel) {
        self.onCancel(nil);
    }
}

- (void)doneTapped
{
    if (self.onDone) {
        self.onDone(nil);
    }
}

@end
