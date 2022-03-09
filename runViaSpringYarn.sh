#!/bin/bash
#Usage - save as *.sh edit as needed file properties -> allow execution -> doubleclick file to execute
#launch terminal for git operations

# CONFIG:
# Edit to select local location for repository
LOC = "$HOME/Desktop"
# Edit to change remot repository
GIT = "git@github.com:viliuskiskis/Darzeliai_Bees_2022.git"
# Edit to change active branch
BRANCH = "master"
# Repo name
NAME = "Darzeliai_Bees_2022"
# Edit to change active commit - if needed - uncomment necessary code below
#COMMIT="891f7fd48ee88106ed033319cf79b5eb1b2a0dd1"

cd $LOC &&

if [ -d $LOC+'/'+$NAME] 
then
    echo "Path exists!" &&
	cd $NAME &&	
	git switch $BRANCH &&
	git fetch --all &&
	git pull
else
    echo "cloning repo to selected location" &&
	git clone -b $BRANCH $GIT $NAME &&
	cd $NAME	
} &&

# BACKEND
# launch separate backend terminal in location and keep it open
# run spring boot
xfce4-terminal --hold --working-directory $LOC/$NAME/back -e "bash -c '
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

# implement endpoint.js comment/uncomment 

# launch separate frontend terminal in location and keep it open
xfce4-terminal --hold --working-directory $LOC/$NAME/front -e 'bash -c "
yarn install && yarn start;
exec bash"'