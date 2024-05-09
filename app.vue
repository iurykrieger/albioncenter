<script setup>
const { locale } = useI18n()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row p-2 gap-4 justify-between bg-secondary">
      <Select v-model="locale">
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma linguagem" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="pt-br">Português (BR)</SelectItem>
            <SelectItem value="en-us">English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select v-model="$colorMode.preference">
        <SelectTrigger>
          <SelectValue placeholder="Selecione um modo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="sepia">Sepia</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <!-- <div>
      <div>
        <h1>Color mode: {{ $colorMode.value }}</h1>
        <select v-model="$colorMode.preference">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="sepia">Sepia</option>
        </select>
        <div>
          <button @click="setLocale('en')">EN-US</button>
          <button @click="setLocale('pt')">PT-BR</button>
          <p>{{ $t('welcome') }}</p>
        </div>
      </div>
  
      <NuxtWelcome />
    </div> -->
  
    <main class="flex flex-1 flex-grow">
      <NuxtPage />
    </main>


  </div>


</template>
