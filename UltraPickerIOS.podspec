Pod::Spec.new do |s|
  s.name         = "UltraPickerIOS"
  s.version      = "1.0.0"
  s.summary      = "UltraPickerIOS"
  s.license      = "private"

  s.authors      = { "author" => "author@domain.com" }
  s.homepage     = "https://github.com/CoolCyberBrain/react-native-ultra-picker-ios"

  s.description  = "UltraPickerIOS"
  s.platform     = :ios, "9.0"

  s.source       = { :git => "https://github.com/CoolCyberBrain/react-native-ultra-picker-ios.git", :tag => "master" }
  s.source_files  = "ios/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"

end