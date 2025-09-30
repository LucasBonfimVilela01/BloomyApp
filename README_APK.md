Gerando um APK (release) localmente — sem EAS

Resumo

Este guia mostra como gerar um APK de release localmente para este projeto React Native criado com Expo (bare workflow) sem usar EAS. Vamos usar o Gradle local (`gradlew.bat`) para criar um APK assinado.

Requisitos

- Java JDK 11 ou 17 (compatível com Gradle 8+). Recomendo JDK 17.
- Android SDK com plataformas e build-tools compatíveis.
- Variáveis de ambiente: ANDROID_HOME (ou ANDROID_SDK_ROOT) apontando para o SDK, e as ferramentas do SDK no PATH (platform-tools, tools/bin).
- Node.js e npm/yarn (para instalar dependências antes do build).
- Windows PowerShell (instruções abaixo usam PowerShell).

Passo 0 — Instalar dependências do projeto

Abra PowerShell na raiz do projeto e rode:

npm install
# ou
# yarn install

Passo 1 — Gerar um keystore (se você não tiver um)

Execute no PowerShell (altere alias, senha e caminhos conforme desejado):

$keyPass = Read-Host -Prompt "Senha do key (recomendado)" -AsSecureString; 
$keyPassPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPass)); 

ejava -jar (Join-Path $env:JAVA_HOME 'bin\keytool.exe') -genkeypair -v -keystore android\release-keystore.jks -storetype JKS -alias mykey -keyalg RSA -keysize 2048 -validity 10000 -storepass $keyPassPlain -keypass $keyPassPlain

Observação: se `java -jar ...` não funcionar, use apenas `keytool` (vem com JDK) ou rode o comando em CMD.

Passo 2 — Criar `key.properties`

Crie o arquivo `android\key.properties` com o conteúdo:

storePassword=<sua_store_password>
keyPassword=<sua_key_password>
keyAlias=mykey
storeFile=release-keystore.jks

Se você tiver colocado o keystore em outro local, atualize `storeFile` para o caminho relativo a `android/`.

Passo 3 — Configurar signingConfig no Gradle

O projeto já tenta carregar `android/key.properties`. Se não existir, o build de release cairá para usar o `debug.keystore` (isso não é recomendado para distribuição). Certifique-se que `android/app/build.gradle` contém a leitura de `key.properties` (já incluída).

Passo 4 — Limpar e construir o APK de release

No PowerShell, execute:

cd android; 
.\gradlew.bat clean; 
.\gradlew.bat assembleRelease

O APK gerado ficará em:

android\app\build\outputs\apk\release\app-release.apk

Passo 5 — Testar o APK em um dispositivo

Para instalar no dispositivo conectado via USB (modo developer + USB debugging):

adb install -r android\app\build\outputs\apk\release\app-release.apk

Resolução de problemas comuns

- Erro de versão do Java/Gradle: use JDK 11 ou 17. Verifique `gradle-wrapper.properties` para versão do Gradle.
- Keystore inexistente: verifique `android/key.properties` e `android/release-keystore.jks`.
- Faltando SDK/Build-tools: abra o Android SDK Manager e instale as versões necessárias (compileSdk normalmente fornecido pelo plugin Expo).

Notas finais

- Este guia gera um APK "standalone". Para publicar no Google Play, é recomendado gerar `app bundle` (AAB) e seguir o processo do Play Console.
- Se você preferir usar a assinatura gerenciada pela Play Store (Google Play App Signing), gere e mantenha o keystore localmente conforme instruções do Play Console.

Se quiser, posso também: gerar comandos exatos para criar o keystore sem prompt; adicionar a configuração completa de `signingConfigs` no `build.gradle` para usar `key.properties` explicitamente; ou guiar você durante a execução do build no seu ambiente.  