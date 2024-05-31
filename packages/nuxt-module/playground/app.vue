<template>
  <div class="flex">
    <div class="basis-full">
      <magic-image
        class="w-full"
        src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
        preload
      />
    </div>
  </div>
  <div class="flex">
    <div class="basis-6/12">
      <magic-image
        class="w-full"
        src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
        :modifiers="{
          ar: '1:1',
          fit: 'crop',
        }"
      />
    </div>
  </div>
  <div class="flex">
    <div class="basis-3/12">
      <magic-image
        class="w-full"
        src="https://images.unsplash.com/photo-1712464857903-57e1393d471d"
      />
    </div>
  </div>
  <div class="flex">
    <div class="basis-1/12">
      <magic-image
        class="w-full"
        src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
      />
    </div>
  </div>
</template>
