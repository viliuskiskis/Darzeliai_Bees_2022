#!/bin/bash
#Usage - save as *.sh edit as needed file properties -> allow execution -> doubleclick file to execute
#launch terminal for git operations

# CONFIG:
# Edit to select local location for repository
LOC="$HOME/Desktop"
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
echo debug1 &&
cd Darzeliai_Bees_2022/back || return &&
# run spring boot
mvn spring-boot:run;
exec bash'" &&

# wait for backend to start - while url return status not in [200...299]
until [[ $(curl -I --silent -o /dev/null -w %{http_code} localhost:8080) =~ 2[0-9][0-9]  ]] ;
do
    printf '...waiting for backend to start'
    sleep 2
done &&
echo ...Hooray! Backend alive &&
sleep 1 &&

# launch separate frontend terminal in location and keep it open
xfce4-terminal --hold --working-directory $LOC/Darzeliai_Bees_2022/front -e 'bash -c "
yarn install &&
yarn start;
exec bash"'