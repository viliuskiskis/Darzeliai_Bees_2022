# powershell script
#	Save as *.ps1, edit variables so suit you
#	run script from Terminal (powershell should be v7.x) for git operations

#					CONFIG:
# Edit to select local location for repository
$LOC = "$home\Desktop"
# Edit to change remot repository
$GIT = "git@github.com:viliuskiskis/Darzeliai_Bees_2022.git"
# Edit to change active branch
$BRANCH = "master"
# Repo name
$NAME = "Darzeliai_Bees_2022"
# Edit to change active commit - if needed - uncomment necessary code below
#$COMMIT = "891f7fd48ee88106ed033319cf79b5eb1b2a0dd1"

Set-Location $LOC

if (Test-Path -Path $LOC'\'$NAME) {
    "repo exists in selected location"
	cd $NAME
	git switch $BRANCH
	git fetch --all
	git pull
} else {
    "cloning repo to selected location"
	git clone $GIT
	cd $NAME	
}

#Start-Process powershell -ArgumentList "-noexit", "-noprofile", "-command &{Get-Location}"

# BACKEND
	# launch separate backend terminal in location and keep it open
	Start-Process pwsh.exe -ArgumentList "-noexit", "-WindowStyle Maximized", "-c &{
		echo 'starting backend'
		cd back
		mvn spring-boot:run
	}"

	# wait for backend to start - while url return status not in [200...299]
	$res = Invoke-WebRequest -Uri http://localhost:8080 -UseBasicParsing | Select-Object -Expand StatusCode
			
	do {
		echo '...waiting for backend to start'
		sleep 2
		}
	until ([int]$res -match '2\d\d')
	
	echo '...Hooray! Backend alive'
	sleep 1

# FRONTEND
	Start-Process pwsh.exe -ArgumentList "-c", {
		echo 'starting frontend'
		cd front
		yarn install
		yarn start
	}, -noexit -WindowStyle Maximized