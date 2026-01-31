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
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Lobitos, Exploradores, Pioneiros, Caminheiros
            $table->text('description');
            $table->string('age_range'); // e.g., "6-10 anos"
            $table->string('color')->nullable(); // Cor da secção
            $table->string('icon')->nullable(); // Ícone/símbolo
            $table->integer('order')->default(0); // Ordem de exibição
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
