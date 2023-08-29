import { EncryptStorage } from "encrypt-storage"
import { EncryptStorageOptions } from "encrypt-storage/dist/types"

const runtimeConfig = useRuntimeConfig()

const options: EncryptStorageOptions = {
  storageType: 'sessionStorage',
  stateManagementUse: true
}

export const useEncryptStorage = new EncryptStorage(runtimeConfig.public.storageKey, options)
