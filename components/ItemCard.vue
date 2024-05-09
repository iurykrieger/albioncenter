<script lang="ts" setup>
import type { ItemData } from '~/server/api/items/[id]/index.get';

export interface ItemCardProps {
    id: string
}

const props = defineProps<ItemCardProps>()
const { locale } = useI18n()

const { data: item, pending } = await useLazyFetch(`/api/items/${props.id}`, {
    query: {
        locale
    }
})
</script>

<template>
    <span v-if="pending">Carregando...</span>
    <Card v-else-if="item" class="max-w-66">
        <CardHeader>
            <CardTitle>{{ item.name }}</CardTitle>
            <CardDescription>{{ item.description }}</CardDescription>
        </CardHeader>
        <CardContent class="flex items-center justify-center gap-6">
            <NuxtImg provider="items" :src="id" :height="800" />

            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2" v-for="slot in Object.keys(item.activeSlots)" :key="slot">
                    <HoverCard v-for="active in item.activeSlots[slot]" :key="active.id" :close-delay="0" :open-delay="0">
                        <HoverCardTrigger as-child>
                            <Button variant="link" class="h-16 w-16">
                                <NuxtImg provider="spells" :src="active.id" />
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent side="top">
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold">{{ active.name }}</h4>
                                <p class="text-sm">{{ active.description }}</p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>

                <div class="flex flex-row gap-2" v-for="slot in Object.keys(item.passiveSlots)" :key="slot">
                    <HoverCard v-for="passive in item.passiveSlots[slot]" :key="passive.id" :close-delay="0" :open-delay="0">
                        <HoverCardTrigger as-child>
                            <Button variant="link" class="h-16 w-16">
                                <NuxtImg provider="spells" :src="passive.id" />
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent side="top">
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold">{{ passive.name }}</h4>
                                <p class="text-sm">{{ passive.description }}</p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </CardContent>
    </Card>
</template>