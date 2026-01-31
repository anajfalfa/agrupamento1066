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
        Schema::create('progression_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scout_id')->constrained('scouts')->onDelete('cascade');
            $table->string('step_name');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
            $table->timestamp('completed_at')->nullable();
            $table->foreignId('validated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progression_steps');
    }
};
