<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <!-- MaaS Provider -->
    <section class="mb-16">
      <h2 class="mb-1 text-2xl font-semibold text-gray-900">MaaS Provider</h2>
      <p class="mb-8 text-gray-600">
        Self-hosted image processing (default provider)
      </p>
      <!-- Basic Transformations -->
      <div class="mb-12">
        <h3 class="mb-4 text-lg font-medium text-gray-900">
          Basic Transformations
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
              :modifiers="{ width: 280, height: 200, fit: 'cover' }"
            />
            <p class="mt-2 text-sm text-gray-700">Original (280×200)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712666410511-4e84e3db6457"
              :modifiers="{ width: 200, height: 200, fit: 'cover' }"
            />
            <p class="mt-2 text-sm text-gray-700">Square crop (200×200)</p>
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
            <p class="mt-2 text-sm text-gray-700">WebP format, quality 80</p>
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
            <p class="mt-2 text-sm text-gray-700">High DPR (2x)</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-12">
        <h3 class="mb-4 text-lg font-medium text-gray-900">
          Filters & Effects
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712464857903-57e1393d471d"
              :modifiers="{ width: 200, height: 200, fit: 'cover', blur: 10 }"
            />
            <p class="mt-2 text-sm text-gray-700">Blur (10)</p>
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
            <p class="mt-2 text-sm text-gray-700">Sharpen (40)</p>
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
            <p class="mt-2 text-sm text-gray-700">Greyscale filter</p>
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
            <p class="mt-2 text-sm text-gray-700">Sepia filter</p>
          </div>
        </div>
      </div>

      <!-- Color Adjustments -->
      <div class="mb-12">
        <h3 class="mb-4 text-lg font-medium text-gray-900">
          Color Adjustments
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
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
            <p class="mt-2 text-sm text-gray-700">Brightness +25</p>
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
            <p class="mt-2 text-sm text-gray-700">Contrast +30</p>
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
            <p class="mt-2 text-sm text-gray-700">Saturation +40</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
              :modifiers="{ width: 180, height: 180, fit: 'cover', hue: 120 }"
            />
            <p class="mt-2 text-sm text-gray-700">Hue shift 120°</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              src="https://images.unsplash.com/photo-1712344252610-6fbe07cf9180"
              :modifiers="{ width: 180, height: 180, fit: 'cover', gamma: 1.4 }"
            />
            <p class="mt-2 text-sm text-gray-700">Gamma 1.4</p>
          </div>
        </div>
      </div>

      <!-- Masks -->
      <div class="mb-12">
        <h3 class="mb-4 text-lg font-medium text-gray-900">Shape Masks</h3>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
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
            <p class="mt-2 text-sm text-gray-700">Circle</p>
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
            <p class="mt-2 text-sm text-gray-700">Star</p>
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
            <p class="mt-2 text-sm text-gray-700">Heart</p>
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
            <p class="mt-2 text-sm text-gray-700">Pentagon</p>
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
            <p class="mt-2 text-sm text-gray-700">Hexagon</p>
          </div>
        </div>
      </div>

      <!-- Transformations -->
      <div class="mb-12">
        <h3 class="mb-4 text-lg font-medium text-gray-900">Transformations</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <p class="mt-2 text-sm text-gray-700">Rotate 45°</p>
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
            <p class="mt-2 text-sm text-gray-700">Mirror horizontal</p>
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
            <p class="mt-2 text-sm text-gray-700">Auto trim</p>
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
            <p class="mt-2 text-sm text-gray-700">Combined effects</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mux Provider -->
    <section class="mb-16">
      <h2 class="mb-1 text-2xl font-semibold text-gray-900">Mux Provider</h2>
      <p class="mb-8 text-gray-600">
        Video thumbnail extraction with precise timing
      </p>

      <!-- Video Thumbnails -->
      <div class="mb-12">
        <h3 class="mb-4 text-lg font-medium text-gray-900">
          Time-based Extraction
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 260, height: 180, fit: 'cover', time: 0 }"
            />
            <p class="mt-2 text-sm text-gray-700">Start (0s)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 260, height: 180, fit: 'cover', time: 10 }"
            />
            <p class="mt-2 text-sm text-gray-700">Middle (10s)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 260, height: 180, fit: 'cover', time: 25 }"
            />
            <p class="mt-2 text-sm text-gray-700">Later (25s)</p>
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
            <p class="mt-2 text-sm text-gray-700">Smart crop (square)</p>
          </div>
        </div>
      </div>

      <!-- Video Transformations -->
      <div class="mb-12">
        <h3 class="mb-4 text-lg font-medium text-gray-900">
          Video Transformations
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 180, height: 260, fit: 'cover', time: 8 }"
            />
            <p class="mt-2 text-sm text-gray-700">Portrait (9:16)</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                rotate: 90,
                time: 12,
              }"
            />
            <p class="mt-2 text-sm text-gray-700">Rotated 90°</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{
                width: 200,
                height: 200,
                fit: 'cover',
                flipHorizontal: true,
                time: 20,
              }"
            />
            <p class="mt-2 text-sm text-gray-700">Horizontal flip</p>
          </div>

          <div>
            <magic-image
              class="w-full border border-gray-200"
              provider="mux"
              src="https://image.mux.com/VXhmc01AijcbmhvZc8V00JmABecQLeL44VhtDfRJoAfuw/thumbnail.jpg"
              :modifiers="{ width: 200, height: 200, fit: 'pad', time: 18 }"
            />
            <p class="mt-2 text-sm text-gray-700">Padded fit</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
