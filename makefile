jar:
	../../gradlew jar
cp:
	cp build/libs/* ../../../Liferay/ce-master/master0711/deploy/
cp2ee70x:
	cp build/libs/* ../../../Liferay/portal-ee-70x-build/deploy/	
deploy:
	../../gradlew deploy
clean:
	../../gradlew clean