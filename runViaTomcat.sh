#!/bin/bash
#Usage - save as *.sh edit as needed file properties -> allow execution -> doubleclick file to execute
#launch terminal for git operations

# CONFIG:
# Edit to select local location for repository
LOC="$HOME/Desktop/DarzeliaiTomcat"
# Edit to change remot repository
GIT="git@github.com:viliuskiskis/Darzeliai_Bees_2022.git"
# Edit to change active branch
BRANCH="master"
# Edit to change active commit - if needed - uncomment necessary code below
COMMIT="891f7fd48ee88106ed033319cf79b5eb1b2a0dd1"

cd $LOC &&
# implement if folder exists then ask and do->

# clone repository to selected location
git clone git@github.com:viliuskiskis/Darzeliai_Bees_2022.git

# BACKEND
# launch separate backend terminal in location and keep it open
xfce4-terminal --hold --working-directory $LOC -e "bash -c '
cd Darzeliai_Bees_2022/back || return &&
# run app on Tomcat sever (port 8081):
 mvn clean install org.codehaus.cargo:cargo-maven2-plugin:1.7.7:run -Dcargo.maven.containerId=tomcat9x -Dcargo.servlet.port=8081 -Dcargo.maven.containerUrl=https://repo1.maven.org/maven2/org/apache/tomcat/tomcat/9.0.40/tomcat-9.0.40.zip
exec bash'"