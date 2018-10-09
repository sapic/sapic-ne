# Steam.Design Desktop

## Install instructions:
### Windows
1: Open an Admin PowerShell and run: `npm i -g --production windows-build-tools`.\
2: Download the SteamWorks SDK from [here.](https://partner.steamgames.com/doc/sdk)\
3: Extract it to any folder and run this in the PowerShell window: `$env:STEAMWORKS_SDK_PATH="Your/Extracted/Path"` replacing with the path of the extracted SDK.\
4: Run `npm i`.\
5: Run `npm run dev`.
### Linux and MacOS
1: Download the SteamWorks SDK from [here.](https://partner.steamgames.com/doc/sdk)\
2: Extract it to any folder and run this in the Terminal window: `STEAMWORKS_SDK_PATH=Your/Path/Here` followed up by `export STEAMWORKS_SDK_PATH`.\
3: Run `npm i`.\
4: Run `npm run dev`.
