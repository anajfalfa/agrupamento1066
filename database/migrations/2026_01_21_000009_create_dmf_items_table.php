<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dmf_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['fardamento', 'roupa_civil', 'acessorios'])->default('fardamento');
            $table->string('size')->nullable(); // XS, S, M, L, XL, etc.
            $table->enum('condition', ['novo', 'bom', 'aceitavel'])->default('bom');
            $table->integer('quantity')->default(1);
            $table->string('location')->nullable(); // Localização no depósito
            $table->boolean('for_donation')->default(true); // Para doar ou para vender
            $table->decimal('price', 8, 2)->nullable(); // Preço se for para vender
            $table->string('image')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dmf_items');
    }
};
