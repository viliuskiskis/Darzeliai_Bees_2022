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
$NAME = "Darzeliai_Bees_2022-sp3-zemelapiai-2"
# Edit to change active commit - if needed - uncomment necessary code below
#$COMMIT = "891f7fd48ee88106ed033319cf79b5eb1b2a0dd1"

Set-Location $LOC

if (Test-Path -Path $LOC'\'$NAME) {
	
	cd $NAME
	Write-Host | Get-Location
	
	# TODO ask if ok to change 
	$curLoc=Get-Location
	$answer1 = Read-Host "repo exists in selected location ("$curLoc" ).`nPull into selected repo? (y)`nSkip updating(any key except y/n)`nEnd program (n)"
	if ($answer1 -eq 'y') {
		Write-Host "...pulling repo"
		git fetch --all
		git switch $BRANCH
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
	Write-Host "...cloned repo"	
}

function endpointMod ($endpoint) {
	Write-Host '...endpoint.js '$endpoint' mod started' 

	$filePath = '.\front\src\components\00Services\endpoint.js'
	$filePathBak = '.\front\src\components\00Services\endpoint.jsBak'
	$tempFilePath = "$env:TEMP\$($filePath | Split-Path -Leaf)"

	$find1 = '.*const apiEndpoint = process.env.PUBLIC_URL.*'
	$replace1off = '// const apiEndpoint = process.env.PUBLIC_URL;'
	$replace1on = ' const apiEndpoint = process.env.PUBLIC_URL;'

	$find2 = '.*const apiEndpoint = "http://localhost:8080".*'
	$replace2on = ' const apiEndpoint = "http://localhost:8080";'
	$replace2off = '// const apiEndpoint = "http://localhost:8080";'
	
	if ($endpoint -eq 'local'){
		((Get-Content -Path $filePath) -replace $find1, $replace1off) -replace $find2, $replace2on | Add-Content -Path $tempFilePath
	}
	elseif ($endpoint -eq 'server'){
		((Get-Content -Path $filePath) -replace $find1, $replace1on) -replace $find2, $replace2off | Add-Content -Path $tempFilePath
	}
	#else Copy-Item -Path $filePath -Destination $tempFilePath

	Remove-Item -Path $filePath 
	#Move-Item -Path $filePath -Destination $filePathBak
	Move-Item -Path $tempFilePath -Destination $filePath

	Write-Host '...endpoint.js '$endpoint' mod finished'
}

function startBackend {
	# BACKEND
	# launch separate backend terminal in location and keep it open
	wt --window 0 -d $LOC'\'$NAME pwsh.exe -c  {
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
	wt --window 0 -d $LOC'\'$NAME pwsh.exe -c {
		Write-Host '...starting frontend'
		cd front
		yarn install
		yarn start
	}
}

function buildApp {
	# build frontend
	Write-Host '...building frontend'
	cd front
	yarn install
	yarn build
	#sleep 30
	cd ..
	#move front to xx
	Move-Item -Path 'front\build\*' -Destination 'back\src\main\resources\public' -Force
	cd back
	mvn clean install
	cd ..
	# move war to ..
	Move-Item -Path 'back\target\darzelis.war' -Destination 'darzelis.war' -Force
	Write-Host 'darzelis.war file is in the root of the project folder'
	
}

$answerBack = Read-Host "start back+front (y)`nstart only front (f)`nbuild application (b)`nstop program (n)"

if ($answerBack -eq 'y') {
	Write-Host '...starting back and front'
	startBackend
	endpointMod('local')
	startFrontend	
}

elseif ($answerBack -eq 'f'){
	Write-Host '...starting front only'
	endpointMod('local')
	startFrontend
}

elseif ($answerBack -eq 'b'){
	Write-Host '...starting build'
	endpointMod('server')
	buildApp
}

elseif ($answer1 -eq 'n') {
	Write-Host "...exiting"
	Exit
}	

