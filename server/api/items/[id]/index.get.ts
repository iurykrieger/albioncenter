
export default defineEventHandler(async (event): Promise<Item> => {
    const itemId = getRouterParam(event, 'id')
    const { locale } = getQuery(event)
    const normalizedLocale: keyof Locales = locale ? locale.toString().toUpperCase() as keyof Locales : 'EN-US' 

    if (!itemId) {
        throw createError({
            status: 400,
            name: 'MissingItemId',
            cause: 'The item id is missing'
        })
    }


    const item = await $fetch<ItemData>(`https://gameinfo.albiononline.com/api/gameinfo/items/${itemId}/data`)

    return {
        ...parseItem(item, normalizedLocale),
        
    }
})

function parseItem(data: ItemData, locale: keyof Locales = 'EN-US'): Item {
    return {
        id: data.uniqueName,
        name: data.localizedNames[locale],
        description: data.localizedDescriptions[locale],
        activeSlots: Object.entries(data.activeSlots || {}).reduce((slots, [slot, active]) => ({
            ...slots,
            [slot]: active.map(item => parseItem(item, locale))
        }), {} as Record<string, Item[]>),
        passiveSlots: Object.entries(data.passiveSlots || {}).reduce((slots, [slot, passive]) => ({
            ...slots,
            [slot]: passive.map(item => parseItem(item, locale))
        }), {} as Record<string, Item[]>)
    }
}

export interface Item {
    id: string
    name: string
    description: string
    activeSlots: Record<string, Item[]>
    passiveSlots: Record<string, Item[]>
}

export interface ItemData {
    itemType: string
    uniqueName: string
    uiSprite: string
    uiSpriteOverlay1: any
    uiSpriteOverlay2: any
    uiSpriteOverlay3: any
    uiAtlas: any
    showinmarketplace: boolean
    level: number
    tier: number
    enchantmentLevel: number
    categoryId: string
    categoryName: string
    revision: number
    enchantments: Enchantment[]
    activeSlots?: Record<string, ItemData[]>
    passiveSlots?: Record<string, ItemData[]>
    localizedNames: Locales
    localizedDescriptions: Locales
    slotType: string
    abilityPower: number
    maxStackSize: number
    weight: number
    spriteName: string
    stackable: boolean
    equipable: boolean
}

export interface Enchantment {
    enchantmentLevel: number
    itemPower: any
    durability: any
    craftingRequirements: CraftingRequirements
}

export interface CraftingRequirements {
    time: number
    silver: any
    craftingFocus: number
    craftResourceList: CraftResourceList[]
}

export interface CraftResourceList {
    uniqueName: string
    count: number
}

export interface Locales {
    "IT-IT": string
    "RU-RU": string
    "PL-PL": string
    "TR-TR": string
    "ID-ID": string
    "FR-FR": string
    "JA-JP": string
    "EN-US": string
    "DE-DE": string
    "AR-SA": string
    "KO-KR": string
    "PT-BR": string
    "ZH-TW": string
    "ES-ES": string
    "ZH-CN": string
}
