# powershell script - window sterminal needs to be installed
#	Save as *.ps1, edit variables so suit you
#	run script from Terminal (powershell should be v7.x) for git operations

#					CONFIG:
# Edit to select local location for repository
$LOC = "$home\Desktop"
# Edit to change remot repository
$GIT = "git@github.com:viliuskiskis/Darzeliai_Bees_2022.git"
# Edit to change active branch
$BRANCH = "JUS-199--separateKindergartenMap"
# Repo name
$NAME = "Darzeliai_Bees_2022-m3"
# Edit to change active commit - if needed - uncomment necessary code below
#$COMMIT = "891f7fd48ee88106ed033319cf79b5eb1b2a0dd1"

Set-Location $LOC

if (Test-Path -Path $LOC'\'$NAME) {
	
	cd $NAME
	Write-Host | Get-Location
	
	# TODO ask if ok to change  
	$answer1 = Read-Host "repo exists in selected location.`nPull into selected repo? (y)`nEnd program (n)"
	if ($answer1 -eq 'y') {
		git switch $BRANCH
		git fetch --all
		git pull }
	elseif ($answer1 -eq 'n') {
		Write-Host "...exiting"
		Exit
	}
	
	# check location:
	#Get-Location | Write-Host
	
	
} else {
    Write-Host "...cloning repo to selected location"
	mkdir $NAME
	git clone -b $BRANCH $GIT $NAME
	cd $NAME	
}

function endpointMod {
	Write-Host '...cloned repo, endpoint.js comment/uncomment started' 

	$filePath = '.\front\src\components\00Services\endpoint.js'
	$tempFilePath = "$env:TEMP\$($filePath | Split-Path -Leaf)"

	$find1 = '.*const apiEndpoint = process.env.PUBLIC_URL.*'
	$replace1 = '// const apiEndpoint = process.env.PUBLIC_URL;'

	$find2 = '.*const apiEndpoint = "http://localhost:8080".*'
	$replace2 = 'const apiEndpoint = "http://localhost:8080";'

	((Get-Content -Path $filePath) -replace $find1, $replace1) -replace $find2, $replace2 | Add-Content -Path $tempFilePath

	Remove-Item -Path $filePath
	Move-Item -Path $tempFilePath -Destination $filePath

	Write-Host '...endpoint.js comment/uncomment finished'
}

function startBackend {
	# BACKEND
	# launch separate backend terminal in location and keep it open
	wt --window 0 -d . pwsh.exe -c  {
		Write-Host '...starting backend'
		cd back
		mvn spring-boot:run
	}
}

function startFrontend {
	# wait for backend to start - while url return status not in [200...299]

	do {
		#ensure we get a response even if an error's returned
		sleep 3
		$response = Invoke-WebRequest -Uri http://localhost:8080 -UseBasicParsing | Select-Object -Expand StatusCode
		Write-Host '...waiting for backend to start; resp code now is: '$response
		}
	until ($response -match '2\d\d')
	
	echo '...Hooray! Backend alive'
	sleep 1

	# FRONTEND
	# launch separate backend terminal in location and keep it open
	wt --window 0 -d . pwsh.exe -c {
		Write-Host '...starting frontend'
		cd front
		yarn install
		yarn start
	}
}

$answerBack = Read-Host "start back+front (y)`nstart only front (f)`nstop program (n)"

if ($answerBack -eq 'y') {
	startBackend
	endpointMod
	startFrontend	
}

elseif ($answerBack -eq 'f'){
	endpointMod
	startFrontend
}

elseif ($answer1 -eq 'n') {
	Write-Host "...exiting"
	Exit
}	

