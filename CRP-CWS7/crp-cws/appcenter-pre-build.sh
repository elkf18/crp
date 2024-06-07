#!/usr/bin/env bash
#cd android && ./gradlew clean && ./gradlew bundleRelease
# npx jetify && cd android && ./gradlew clean
# npx jetify && cd ios && pod install
npx jetify && sudo gem install cocoapods-user-defined-build-types && cd ios && pod deintegrate && rm -rf Pods && rm -rf build && pod update && pod install && cd ../