def input_tap(x, y)
  system "adb -s localhost:5555 shell input_tap #{x} #{y}"
  sleep 0.5
end


Dir.chdir '/home/supechicken/secrets_page' do
  current_head = `git rev-parse --short HEAD`

  system 'git pull'
  system 'adb connect localhost:5555'

  if current_head != `git rev-parse --short HEAD`
    # have update

    input_tap 153, 322
    input_tap 343, 573
    input_tap 255, 90

    system "adb shell am broadcast -a ADB_INPUT_TEXT --es msg 'test'"
    sleep 0.5

    input_tap 212, 1033
    input_tap 186, 897
    input_tap 624, 66
    input_tap 650, 1118
  end
end
