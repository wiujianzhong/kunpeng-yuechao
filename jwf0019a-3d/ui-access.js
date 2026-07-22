const calibrationContent = document.querySelector('#calibration-private-content');
const calibrationPassword = document.querySelector('#calibration-password');
const calibrationUnlock = document.querySelector('#calibration-unlock');
const calibrationLockStatus = document.querySelector('#calibration-lock-status');

function lockCalibration() {
  calibrationContent.hidden = true;
  calibrationPassword.hidden = false;
  calibrationPassword.value = '';
  calibrationUnlock.textContent = '解锁';
  calibrationUnlock.dataset.state = 'locked';
  calibrationLockStatus.textContent = '';
}

function unlockCalibration() {
  if (calibrationUnlock.dataset.state === 'unlocked') {
    lockCalibration();
    calibrationPassword.focus();
    return;
  }

  if (calibrationPassword.value !== '12345678') {
    calibrationLockStatus.textContent = '密码错误';
    calibrationPassword.select();
    return;
  }

  calibrationContent.hidden = false;
  calibrationPassword.hidden = true;
  calibrationPassword.value = '';
  calibrationUnlock.textContent = '收起';
  calibrationUnlock.dataset.state = 'unlocked';
  calibrationLockStatus.textContent = '已解锁';
}

calibrationUnlock.addEventListener('click', unlockCalibration);
calibrationPassword.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') unlockCalibration();
});

lockCalibration();
