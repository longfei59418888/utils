FROM reactnativecommunity/react-native-android:latest

WORKDIR /project/android

RUN corepack enable
RUN corepack prepare yarn@4.0.2 --activate && yarn set version 4.0.2
RUN yarn install
RUN chmod +x gradlew && ./gradlew assembleDevRelease

