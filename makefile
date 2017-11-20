jar:
	../../gradlew jar
cp:
	cp build/libs/* ../../../../Liferay/ce/bundles/deploy/
cp2ee70x:
	cp build/libs/* ../../../../Liferay/ee/bundles/deploy/	
deploy:
	../../gradlew deploy
clean:
	../../gradlew clean