<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string $name
     * @property string|null $description
     * @property string|null $due_date
     * @property string $status
     * @property string|null $image_path
     * @property int $created_by
     * @property int $updated_by
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read \App\Models\User $createdBy
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Task> $tasks
     * @property-read int|null $tasks_count
     * @property-read \App\Models\User $updatedBy
     * @method static \Database\Factories\ProjectFactory factory($count = null, $state = [])
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedBy($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDescription($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDueDate($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereImagePath($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereStatus($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedBy($value)
     * @mixin \Eloquent
     */
    class Project extends \Eloquent
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string $name
     * @property string|null $description
     * @property string|null $due_date
     * @property string|null $image_path
     * @property string $status
     * @property string $priority
     * @property int $assigned_user_id
     * @property int $created_by
     * @property int $updated_by
     * @property int $project_id
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read \App\Models\User $assignedUser
     * @property-read \App\Models\User $createdBy
     * @property-read \App\Models\Project $project
     * @property-read \App\Models\User $updatedBy
     * @method static \Database\Factories\TaskFactory factory($count = null, $state = [])
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereAssignedUserId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereCreatedBy($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereDescription($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereDueDate($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereImagePath($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task wherePriority($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereProjectId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereStatus($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereUpdatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereUpdatedBy($value)
     * @mixin \Eloquent
     */
    class Task extends \Eloquent
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string $name
     * @property string $email
     * @property \Illuminate\Support\Carbon|null $email_verified_at
     * @property string $password
     * @property string|null $remember_token
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
     * @property-read int|null $notifications_count
     * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
     * @mixin \Eloquent
     */
    class User extends \Eloquent
    {
    }
}

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Support\Carbon;

class Project
{
    public int $id;

    public string $name;

    public string|null $description;

    public string|null $due_date;

    public string $status;

    public string|null $image_path;

    public int $created_by;

    public int $updated_by;

    /**
     * @var Illuminate\Support\Carbon|null
     */
    public Carbon|null $created_at;

    /**
     * @var Illuminate\Support\Carbon|null
     */
    public Carbon|null $updated_at;

    /**
     * @var App\Models\User
     */
    public User $createdBy;

    /**
     * @var Illuminate\Database\Eloquent\Collection<int,App\Models\Task>
     */
    public Collection $tasks;

    public int|null $tasks_count;

    /**
     * @var App\Models\User
     */
    public User $updatedBy;

    public function tasks()
    {
    }
}

class Task
{
    public int $id;

    public string $name;

    public string|null $description;

    public string|null $due_date;

    public string|null $image_path;

    public string $status;

    public string $priority;

    public int $assigned_user_id;

    public int $created_by;

    public int $updated_by;

    public int $project_id;

    /**
     * @var Illuminate\Support\Carbon|null
     */
    public Carbon|null $created_at;

    /**
     * @var Illuminate\Support\Carbon|null
     */
    public Carbon|null $updated_at;

    /**
     * @var App\Models\User
     */
    public User $assignedUser;

    /**
     * @var App\Models\User
     */
    public User $createdBy;

    /**
     * @var App\Models\Project
     */
    public Project $project;

    /**
     * @var App\Models\User
     */
    public User $updatedBy;
}


class User
{
    public int $id;

    public string $name;

    public string $email;

    /**
     * @var Illuminate\Support\Carbon|null
     */
    public Carbon|null $email_verified_at;

    public string $password;

    public string|null $remember_token;

    /**
     * @var Illuminate\Support\Carbon|null
     */
    public Carbon|null $created_at;

    /**
     * @var Illuminate\Support\Carbon|null
     */
    public Carbon|null $updated_at;

    /**
     * @var Illuminate\Notifications\DatabaseNotificationCollection<int,Illuminate\Notifications\DatabaseNotification>
     */
    public DatabaseNotificationCollection $notifications;

    public int|null $notifications_count;
}
