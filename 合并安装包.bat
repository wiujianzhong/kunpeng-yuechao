@echo off
echo 正在合并离线安装包...
copy /b Hermes_Setup_part_00 + Hermes_Setup_part_01 Hermes_Setup.exe
echo 合并完成！双击 Hermes_Setup.exe 开始安装
pause
