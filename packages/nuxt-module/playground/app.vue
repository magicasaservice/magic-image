<template>
  <div class="max-w-6xl mx-auto py-8 px-4">
    <!-- MaaS Provider -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-gray-900 mb-1">MaaS Provider</h2>
      <p class="text-gray-600 mb-8">
        Self-hosted image processing (default provider)
      </p>
      <!-- Basic Transformations -->
      <div class="mb-12">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Basic Transformations
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
              :modifiers="{ width: 280, height: 200, fit: 'cover' }"
            />
            <p class="text-sm text-gray-700 mt-2">Original (280×200)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
              :modifiers="{ width: 200, height: 200, fit: 'cover' }"
            />
            <p class="text-sm text-gray-700 mt-2">Square crop (200×200)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
              :modifiers="{
                width: 280,
                height: 200,
                fit: 'cover',
                format: 'webp',
                quality: 80,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">WebP format, quality 80</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
              :modifiers="{
                width: 280,
                height: 200,
                fit: 'cover',
                pixelDensity: 2,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">High DPR (2x)</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-12">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Filters & Effects
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712464857903-57e1393d471d"
              :modifiers="{ width: 200, height: 200, fit: 'cover', blur: 10 }"
            />
            <p class="text-sm text-gray-700 mt-2">Blur (10)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712464857903-57e1393d471d"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                sharpen: 40,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Sharpen (40)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712464857903-57e1393d471d"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                filter: 'greyscale',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Greyscale filter</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712464857903-57e1393d471d"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                filter: 'sepia',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Sepia filter</p>
          </div>
        </div>
      </div>

      <!-- Color Adjustments -->
      <div class="mb-12">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Color Adjustments
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
              :modifiers="{
                width: 180,
                height: 180,
                fit: 'cover',
                brightness: 25,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Brightness +25</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
              :modifiers="{
                width: 180,
                height: 180,
                fit: 'cover',
                contrast: 30,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Contrast +30</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
              :modifiers="{
                width: 180,
                height: 180,
                fit: 'cover',
                saturation: 40,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Saturation +40</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
              :modifiers="{ width: 180, height: 180, fit: 'cover', hue: 120 }"
            />
            <p class="text-sm text-gray-700 mt-2">Hue shift 120°</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
              :modifiers="{ width: 180, height: 180, fit: 'cover', gamma: 1.4 }"
            />
            <p class="text-sm text-gray-700 mt-2">Gamma 1.4</p>
          </div>
        </div>
      </div>

      <!-- Masks -->
      <div class="mb-12">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Shape Masks</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
              :modifiers="{
                width: 160,
                height: 160,
                fit: 'cover',
                mask: 'circle',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Circle</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
              :modifiers="{
                width: 160,
                height: 160,
                fit: 'cover',
                mask: 'star',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Star</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
              :modifiers="{
                width: 160,
                height: 160,
                fit: 'cover',
                mask: 'heart',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Heart</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
              :modifiers="{
                width: 160,
                height: 160,
                fit: 'cover',
                mask: 'pentagon',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Pentagon</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
              :modifiers="{
                width: 160,
                height: 160,
                fit: 'cover',
                mask: 'hexagon',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Hexagon</p>
          </div>
        </div>
      </div>

      <!-- Transformations -->
      <div class="mb-12">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Transformations</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1593642634443-44adaa06623a"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                rotate: 45,
                background: 'white',
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Rotate 45°</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1593642634443-44adaa06623a"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                mirror: true,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Mirror horizontal</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1593642634443-44adaa06623a"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                trimImage: true,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Auto trim</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1593642634443-44adaa06623a"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                mask: 'circle',
                brightness: 15,
                sharpen: 25,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Combined effects</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mux Provider -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-gray-900 mb-1">Mux Provider</h2>
      <p class="text-gray-600 mb-8">
        Video thumbnail extraction with precise timing
      </p>

      <!-- Video Thumbnails -->
      <div class="mb-12">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Time-based Extraction
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 260, height: 180, fit: 'crop', time: 0 }"
            />
            <p class="text-sm text-gray-700 mt-2">Start (0s)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 260, height: 180, fit: 'crop', time: 10 }"
            />
            <p class="text-sm text-gray-700 mt-2">Middle (10s)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 260, height: 180, fit: 'crop', time: 25 }"
            />
            <p class="text-sm text-gray-700 mt-2">Later (25s)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'smartcrop',
                time: 15,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Smart crop (square)</p>
          </div>
        </div>
      </div>

      <!-- Video Transformations -->
      <div class="mb-12">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Video Transformations
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 180, height: 260, fit: 'crop', time: 8 }"
            />
            <p class="text-sm text-gray-700 mt-2">Portrait (9:16)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'crop',
                rotate: 90,
                time: 12,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Rotated 90°</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'crop',
                flipHorizontal: true,
                time: 20,
              }"
            />
            <p class="text-sm text-gray-700 mt-2">Horizontal flip</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 200, height: 200, fit: 'pad', time: 18 }"
            />
            <p class="text-sm text-gray-700 mt-2">Padded fit</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
