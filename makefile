jar:
	../../gradlew jar
cp:
	cp build/libs/* ../../../Liferay/portal-ce-master-build/deploy/
cp2ee70x:
	cp build/libs/* ../../../Liferay/portal-ee-70x-build/deploy/	
deploy:
	../../gradlew deploy
clean:
	../../gradlew clean