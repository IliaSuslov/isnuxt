<template>
  <footer class="bg-[var(--primary)] flex flex-col gap-[56px] px-4 md:px-32 relative">
    <div class="pt-16">
      <p class="text-xl">Is there a project?</p>
    </div>
    <div class="flex flex-col place-content-between gap-4 md:flex-row">
      <div>
        <h2 class="text-[24px] underline decoration-from-font md:text-[112px]">
          Let's work <br />
          together
        </h2>
      </div>
      <div class="grid grid-cols-2">
        <div class="space-y-16">
          <div>
            <p class="text-lg mb-2">For all questions</p>
            <p class="text-lg">+7 (920) 278-00-68</p>
            <p class="text-lg">qtim@agency.com</p>
          </div>

          <div>
            <p class="text-lg mb-2">Office in Russia</p>
            <p class="text-lg mb-4">139 Ruben Station Lake<br />Drew, NM 52678</p>
            <VButton size="sm" variant="footer">
              <FooterArrow color="var(--primary)" />
            </VButton>
          </div>

          <div>
            <p class="text-lg mb-2">Office in Dubai</p>
            <p class="text-lg mb-4">139 Ruben Station Lake<br />Drew, NM 52678</p>
            <VButton variant="footer" size="sm">
              <FooterArrow color="var(--primary)" />
            </VButton>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 flex justify-center">
      <span
        class="bg-black text-white w-[358px] h-[178px] rounded-t-full flex items-end justify-center text-3xl pb-[25px] invisible md:visible"
      >
        Go
      </span>
    </div>

    <div class="pb-6">
      <div class="flex flex-col gap-2 md:justify-between md:flex-row">
        <div class="flex space-x-8">
          <VLink to="#" underlined class="hover:text-black">Facebook</VLink>
          <VLink to="#" underlined class="hover:text-black">Instagram</VLink>
          <VLink to="#" underlined class="hover:text-black">Telegram</VLink>
        </div>
        <div class="flex space-x-8">
          <VLink to="#" underlined class="hover:text-black">Behance</VLink>
          <VLink to="#" underlined class="hover:text-black">LinkedIn</VLink>
          <VLink to="#" underlined class="hover:text-black">Privacy Policy</VLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style></style>
