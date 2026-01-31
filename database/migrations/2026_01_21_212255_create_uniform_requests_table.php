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
        Schema::create('uniform_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scout_id')->constrained('scouts')->onDelete('cascade');
            $table->enum('item_type', ['farda', 'loja']);
            $table->text('details');
            $table->enum('status', ['pending', 'ordered', 'completed'])->default('pending');
            $table->foreignId('processed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uniform_requests');
    }
};
