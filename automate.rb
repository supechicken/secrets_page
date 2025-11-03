require 'json'

def input_tap(x, y)
  system "adb -s localhost:5555 shell input swipe #{x} #{y} #{x} #{y} 150"
  sleep 0.5
end

Dir.chdir '/home/supechicken/secrets_page' do
  current_head = `git rev-parse --short HEAD`

  system 'git pull'
  system 'adb connect localhost:5555'

  updated_head      = `git rev-parse --short HEAD`
  last_changed_file = `git diff --name-status HEAD~ HEAD | grep '^A'`.chomp.split("\t", 2)[-1]

  if last_changed_file && (ARGV.include?('--force') || current_head != updated_head)
    response = JSON.load_file(last_changed_file, symbolize_names: true)

    # have update
    input_tap 150, 312
    input_tap 343, 573
    input_tap 255, 90

    system 'adb', 'shell', 'am', 'broadcast', '-a', 'ADB_INPUT_TEXT', '--es', 'msg', response[:response].inspect
    sleep 0.5

    input_tap 212, 1033
    input_tap 186, 897
    input_tap 624, 66
    input_tap 650, 1118
    input_tap 434, 1120
    input_tap 434, 1120
  end
end
